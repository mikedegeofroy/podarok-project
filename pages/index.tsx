import toast from 'react-hot-toast'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <button onClick={() => {toast.success("My cock is now hard :)")}}></button>
    </div>
  )
}
