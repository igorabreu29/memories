import nlwLogo from '../assets/nlw-logo.svg'
import Image from 'next/image'

export function Hero() {
    return (
     <div className='space-y-5'>
        <Image src={nlwLogo} alt='logo nlw' />

        <div className='max-w-[420px] space-y-1'>
          <h1 className='text-5xl font-bold leading-tight'>Sua capsula do tempo</h1>
          <p className='text-lg leading-relaxed'>
            Colecione momentos marcantes da sua jornada (se quiser) com o mundo!
          </p>

        </div>
        <a className='inline-block rounded-full bg-green-500 hover:bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black' href="">CADASTRAR LEMBRANÇA</a>
      </div>
    )
}