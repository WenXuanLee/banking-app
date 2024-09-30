import React, { useEffect, useState, useCallback } from 'react'
import { usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.action';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      console.log('::getLinkToken data', data);
      setToken(data?.linkToken) 
    }
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })
    router.push('/');
  }, [user]);

  const config = {
    token,
    onSuccess,
  }

  const { open, ready } = usePlaidLink(config)
  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect Bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button>
          Connect Bank
        </Button>
      ) : (
        <Button>
          ConnectBank
        </Button>)}
    </>
  )
}

export default PlaidLink