
import useToggle from '@/hooks/useToggle'
import clsx from 'clsx'
import { X } from 'lucide-react';
import { Button } from 'react-bootstrap'

const LoadContentButton = ({ name, className }: { name: string; className?: string }) => {
  const { isTrue: isOpen, toggle } = useToggle()
  return (
    <Button
      onClick={toggle}
      variant="link"
      role="button"
      className={clsx(className, 'btn-link-loader btn-sm text-secondary d-flex align-items-center', { active: isOpen })}
      data-bs-toggle="button"
      aria-pressed="true">
      {
        !isOpen ? <div className="spinner-dots me-2">
        <span className="spinner-dot" />
        <span className="spinner-dot" />
        <span className="spinner-dot" />
      </div> : 
        <X size={'20px'} style={{marginRight : '3px'}}/>
      }
      {name}
    </Button>
  )
}
export default LoadContentButton
