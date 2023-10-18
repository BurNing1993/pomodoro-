import { useRouteError } from 'react-router-dom'
// import { ErrorCircle } from '../../components/icons'
// import ThemeButton from '../../layout/ThemeButton'

export default function ErrorPage() {
  const error = useRouteError() as any
  return (
    <div>
      <div className="text-center p-10 flex gap-2 flex-col">
        {/* <ErrorCircle className="text-8xl mx-auto text-red-500" /> */}
        <h1 className="font-semibold text-xl">出错了!</h1>
        <p>发生错误了,请稍后再试或向开发者反馈!</p>
        {error && (
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        )}
        <div>
          <button
            className="primary-btn"
            onClick={() => window.devAPI.toggleDevtools()}
          >
            devtools
          </button>
        </div>
        {/* <div>
          <button
            className="default-btn"
            onClick={() =>
              window.electronAPI.openExternal(
                'https://github.com/joey2217/simple-music/issues'
              )
            }
          >
            反馈BUG
          </button>
        </div> */}
      </div>
    </div>
  )
}
