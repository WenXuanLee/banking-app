import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.action';

const Home = async () => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Weclome"
            subtext="Access and manage your account"
            user={loggedIn.name} />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250}
          />
        </header>
        RECENT TRANSCTION
      </div>
      <RightSidebar
        user={{ name: loggedIn.name, email: loggedIn.email }}
        transactions={[]}
        banks={[{ currentBalance: 1250 }, { currentBalance: 1550 }]}
      />
    </section>
  )
}

export default Home;