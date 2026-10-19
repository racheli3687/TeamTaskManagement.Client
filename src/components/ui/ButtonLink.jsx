import { Link } from 'react-router'
import { buttonStyles } from '../../lib/buttonStyles'

export default function ButtonLink({ variant, size, icon: Icon, className, children, ...props }) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {Icon && <Icon className="size-4" aria-hidden />}
      {children}
    </Link>
  )
}
