import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'reactstrap';

function App() {
  const [modal, setModal] = useState(false)

  return (
    <>
      <h1>Ola mundo</h1>
      <button 
      onClick={()=> setModal(true)}
      className='btn-danger'>Clique aqui</button>

      <Modal isOpen={modal} toggle={()=> setModal(!modal)}>
          <h1>Teste modal</h1>
      </Modal>

    </>
  )
}

export default App
