
import useToggle from '@/hooks/useToggle'
import clsx from 'clsx'
import { Button } from 'react-bootstrap'

const LoadMoreButton = ({limit,setLimit,isSpinning}) => {
  return (
    <Button disabled
      onClick={() => {
        setLimit(limit+5);
        console.log('-----limit-------',limit);
      }}
      variant="primary-soft"
      role="button"
      className={clsx('btn-loader', { active: isSpinning })}
      data-bs-toggle="button"
      aria-pressed="true">
      <span className="load-text"> no more post  </span>
      <div className="load-icon">
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Button>
  )
}
export default LoadMoreButton
