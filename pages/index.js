import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>video playlist</title>
        <meta name="description" content="create video playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <form>
            <label htmlFor="videoLink">
                add video link
            </label>
            <input
                type="text"
                id="videoLink" />
            <button>
                +
            </button>
        </form>

        <div>
            <div>
                <button>
                    x
                </button>
                <div>

                </div>
                <p>this is a title</p>
            </div>
        </div>
    </div>
  );
}
