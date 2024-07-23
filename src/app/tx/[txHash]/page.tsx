'use client';

import { useState, useEffect, useReducer } from 'react';
import { getTransactionDetails } from '../../../api/api';
import { TransactionDetails } from '../../../types/types';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import {
    TransactionWrapper,
    Title,
    DetailItem,
    TransactionLink,
} from './styles';

type State = {
    transaction: TransactionDetails | null;
    loading: boolean;
    error: string | null;
};

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: TransactionDetails }
    | { type: 'FETCH_ERROR'; payload: string };

const initialState: State = {
    transaction: null,
    loading: true,
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, transaction: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function TransactionDetailsPage({
    params,
}: {
    params: { txHash: string };
}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const determineNetworkAndFetch = async () => {
            dispatch({ type: 'FETCH_START' });

            const networks: ('ethereum' | 'polygon')[] = [
                'ethereum',
                'polygon',
            ];

            for (const network of networks) {
                try {
                    const txDetails = await getTransactionDetails(
                        params.txHash,
                        network
                    );
                    dispatch({ type: 'FETCH_SUCCESS', payload: txDetails });
                    return;
                } catch (error) {
                    console.log(
                        `Not a ${network} transaction, trying next network`
                    );
                }
            }

            dispatch({
                type: 'FETCH_ERROR',
                payload: 'Transaction not found on either network',
            });
        };

        determineNetworkAndFetch();
    }, [params.txHash]);

    if (state.loading) return <LoadingSpinner />;
    if (state.error) return <ErrorMessage message={state.error} />;
    if (!state.transaction)
        return <ErrorMessage message="Transaction not found" />;

    const { transaction } = state;

    // Convert Wei to ETH
    const amountInEth = parseInt(transaction.value || '0', 16) / 1e18;

    // Convert Wei to Gwei for gas price
    const gasPriceInGwei = parseInt(transaction.gasPrice || '0', 16) / 1e9;

    return (
        <TransactionWrapper>
            <Title>Transaction Details</Title>
            <DetailItem>
                <strong>Hash:</strong>{' '}
                <TransactionLink
                    href={`https://${
                        transaction.network === 'ethereum'
                            ? 'etherscan.io'
                            : 'polygonscan.com'
                    }/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {transaction.hash}
                </TransactionLink>
            </DetailItem>
            <DetailItem>
                <strong>Amount:</strong> {amountInEth.toFixed(18)}{' '}
                {transaction.network === 'ethereum' ? 'ETH' : 'MATIC'}
            </DetailItem>
            <DetailItem>
                <strong>Timestamp:</strong>{' '}
                {transaction.timeStamp !== '0'
                    ? new Date(
                          parseInt(transaction.timeStamp) * 1000
                      ).toLocaleString()
                    : 'Pending'}
            </DetailItem>
            <DetailItem>
                <strong>Confirmation Status:</strong> {transaction.status}
            </DetailItem>
            <DetailItem>
                <strong>From:</strong> {transaction.from}
            </DetailItem>
            <DetailItem>
                <strong>To:</strong> {transaction.to}
            </DetailItem>
            <DetailItem>
                <strong>Gas Price:</strong> {gasPriceInGwei.toFixed(9)} Gwei
            </DetailItem>
            {transaction.status !== 'Pending' && (
                <DetailItem>
                    <strong>Gas Used:</strong> {transaction.gasUsed}
                </DetailItem>
            )}
            {transaction.status !== 'Pending' && (
                <DetailItem>
                    <strong>Transaction Fee:</strong>{' '}
                    {(
                        (parseInt(transaction.gasUsed) * gasPriceInGwei) /
                        1e9
                    ).toFixed(8)}{' '}
                    ETH
                </DetailItem>
            )}
        </TransactionWrapper>
    );
}
