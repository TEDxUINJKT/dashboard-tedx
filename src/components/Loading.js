import { useSelector, useDispatch } from 'react-redux'
import { ResetLoadingActions } from '../state/loading/action'
import LoadingBar from 'react-top-loading-bar'

export default function Loading() {
    const { loading = 0 } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <LoadingBar
            color='var(--red)'
            progress={loading}
            onLoaderFinished={() => dispatch(ResetLoadingActions())}
        />
    )
}