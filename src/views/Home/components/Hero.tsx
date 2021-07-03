import { relative } from 'path';
import React, { Component } from 'react'
import Sky from 'react-sky'

class Hero extends Component {
    render() {
      return (
        <div style={{
            height: '300px',
            width: '900px',
            position: 'relative',
            padding: '0px',
            margin: '0px',
        }}>
            <Sky
                images={{
                    0: 'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png',
                    1: 'https://s3.amazonaws.com/token-icons/0xc00e94cb662c3520282e6f5717214004a7f26888.png',
                    2: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png',
                    3: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
                    4: 'https://s3.amazonaws.com/token-icons/0x514910771af9ca656af840dff83e8264ecf986ca.png',
                    5: 'https://s3.amazonaws.com/token-icons/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png',
                    6: 'https://s3.amazonaws.com/token-icons/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png',
                    7: 'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png',
                    8: 'https://s3.amazonaws.com/token-icons/0x429881672b9ae42b8eba0e26cd9c73711b891ca5.png',
                    9: 'https://assets.coingecko.com/coins/images/11976/small/Cream.png',
                    10: 'https://raw.githubusercontent.com/pie-dao/assets/master/logos/usdc.svg',
                    11: 'https://raw.githubusercontent.com/pie-dao/assets/master/logos/dai.svg',
                    12: 'https://raw.githubusercontent.com/pie-dao/assets/master/logos/tusd.svg',
                    13: 'https://raw.githubusercontent.com/pie-dao/assets/master/logos/sUSD.png',
                    14: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
                    15: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
                    16: 'https://s3.amazonaws.com/token-icons/0xba100000625a3754423978a60c9317c58a424e3d.png'
                }}
                how={62} /* Pass the number of images Sky will render chosing randomly */
                time={120} /* time of animation */
                size={'50px'} /* size of the rendered images */
            />
      </div>
    );
  }
}
export default Hero;