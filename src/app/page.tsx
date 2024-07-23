'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { HomeWrapper, Title, Form, Input, Button } from './styles';

export default function Home() {
    const [address, setAddress] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (address) {
            router.push(`/${address}`);
        }
    };

    return (
        <HomeWrapper>
            <Title>Enter an Ethereum or Polygon address</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="0x..."
                />
                <Button type="submit">Search</Button>
            </Form>
        </HomeWrapper>
    );
}
