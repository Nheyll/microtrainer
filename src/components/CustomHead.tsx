import Head from 'next/head'

export default function CustomHead(props: { title: string, description: string }) {
    const { title, description } = props
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
