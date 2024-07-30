import { getIronSession, IronSessionData } from 'iron-session';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';

import VerifyAccount from '@/components/CheckAccount/Verify';
import VerifyAccountResult from '@/components/CheckAccount/VerifyResult';
import { sessionOptions } from '@/libs/session';
import { AgeResponse } from '@/models';
import UserService from '@/services/user-service';

export default function CheckAccount({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [verified, setVerified] = useState(false);
  const [ageResponse, setAgeResponse] = useState<AgeResponse>(undefined);

  useEffect(() => {
    const getAges = async () => {
      const response = await UserService.getAges();
      setAgeResponse(response);
    };
    if (session.tgChatId) {
      getAges();
    }
  }, [session.tgChatId]);

  if (!verified) {
    return <VerifyAccount onVerifyCompleted={() => setVerified(true)} />;
  }

  return <VerifyAccountResult isPremium={session.isPremium} {...ageResponse} />;
}

export const getServerSideProps = (async (context) => {
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}) satisfies GetServerSideProps<{
  session: IronSessionData;
}>;
