'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAddressDetails, getTransactions } from '../../api/api';
import { AddressDetails, Transaction } from '../../types/types';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {
    AddressText,
    AddressWrapper,
    Balance,
    SortButton,
    SortButtons,
    Title,
    TransactionAmount,
    TransactionItem,
    TransactionList,
    TransactionTime,
} from './styles';

const SAMPLE_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'; // Ethereum address for demo

export default function AddressDetailsPage({
    params,
}: {
    params: { address: string };
}) {
    const { address } = params;
    const [addressDetails, setAddressDetails] = useState<AddressDetails | null>(
        null
    );
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'timestamp' | 'amount'>('timestamp');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const addressToFetch = address || SAMPLE_ADDRESS;
        fetchData(addressToFetch);
    }, [address]);

    const fetchData = async (addressHash: string) => {
        setLoading(true);
        setError(null);

        try {
            const [details, txs] = await Promise.all([
                getAddressDetails(addressHash),
                getTransactions(addressHash),
            ]);
            setAddressDetails(details);
            setTransactions(txs.slice(0, 100));
        } catch (err) {
            if (
                err instanceof Error &&
                err.message === 'Unable to fetch balance from either network'
            ) {
                setError(
                    'No balance found on Ethereum or Polygon networks for this address.'
                );
            } else {
                setError('Error fetching data. Please try again.');
            }
            console.error('Error fetching data:', err);
            if (err instanceof Error) {
                console.error('Error message:', err.message);
            }
        }

        setLoading(false);
    };

    const handleSort = (field: 'timestamp' | 'amount') => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        if (sortBy === 'amount') {
            const aValue = parseFloat(a.value) || 0;
            const bValue = parseFloat(b.value) || 0;
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            const aTime = parseInt(a.timeStamp) || 0;
            const bTime = parseInt(b.timeStamp) || 0;
            return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
        }
    });

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!addressDetails)
        return <ErrorMessage message="Address details not found" />;

    console.log({ address: transactions });

    return (
        <AddressWrapper>
            <Title>
                Address: <AddressText>{address}</AddressText>
            </Title>{' '}
            <Balance>
                Balance:{' '}
                {addressDetails.balance
                    ? `${addressDetails.balance.toFixed(6)} ${
                          addressDetails.network === 'polygon' ? 'MATIC' : 'ETH'
                      }`
                    : 'N/A'}
            </Balance>
            <SortButtons>
                <SortButton onClick={() => handleSort('timestamp')}>
                    Sort by Time{' '}
                    {sortBy === 'timestamp' &&
                        (sortOrder === 'asc' ? '↑' : '↓')}
                </SortButton>
                <SortButton onClick={() => handleSort('amount')}>
                    Sort by Amount{' '}
                    {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </SortButton>
            </SortButtons>
            <TransactionList>
                {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((tx) => (
                        <TransactionItem key={tx.hash}>
                            <Link href={`/tx/${tx.hash}`}>
                                <TransactionAmount>
                                    Amount:{' '}
                                    {tx.value ? `${tx.value} ETH` : 'N/A'}
                                </TransactionAmount>
                            </Link>
                            <TransactionTime>
                                {tx.timeStamp
                                    ? new Date(
                                          parseInt(tx.timeStamp)
                                      ).toLocaleString()
                                    : 'N/A'}
                            </TransactionTime>
                        </TransactionItem>
                    ))
                ) : (
                    <p>No transactions found.</p>
                )}
            </TransactionList>
        </AddressWrapper>
    );
}
