import Rift from '@/components/Rift'
import CustomHead from '@/components/CustomHead'

export default function Home() {
  return (
    <>
      <CustomHead title={'Vidya'} description={'Lourd'} />
      <main>
        <Rift />
      </main>
    </>
  )
}
