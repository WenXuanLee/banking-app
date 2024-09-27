import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Weclome"
            subtext="Access and manage your account"
            user="guest" />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250}
          />
        </header>
        RECENT TRANSCTION
      </div>
      <RightSidebar
        user={{ firstName: 'Ben', lastName: "Lee", email: 'test@gamil.com' }}
        transactions={[]}
        banks={[{ currentBalance: 1250 }, { currentBalance: 1550 }]}
      />
    </section>
  )
}

export default Home;