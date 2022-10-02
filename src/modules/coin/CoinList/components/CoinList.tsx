import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Coin from './Coin'

const CoinList = () => {
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState<any[]>([])
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        {/* <h1 className="coin-text">Search your desired coin</h1> */}
        <form action="">
          <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange} />

        </form>

      </div>
      {filteredCoins.map(coin => {
        const data = {
          name: coin.name,
          image: coin.image,
          volume: coin.total_volume,
          marketcap: coin.market_cap,
          price: coin.current_price,
          pricechange: coin.price_change_percentage_24h,
        }
        return (
          <Coin
            data={data}
            key={coin.id}
          />
        );
      })}

    </div>
  );
}

export default CoinList