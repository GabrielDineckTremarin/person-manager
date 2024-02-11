import {Row, Col, Button, Modal } from 'reactstrap'
import { deletePerson } from '../../ApiService/ApiService'; 
import { useNavigate  } from "react-router-dom";
import { showMessage }from '../../Utils/utils'


interface DeleteModalProps {
    isOpen: boolean;
    toggleModal: () => void;
    personId: string
    reloadWindow: () => void;

  }

  const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, toggleModal, personId, reloadWindow}) => {
    const navigate = useNavigate();
    const handleDeletePerson = async ()  => {
        try {
          const data = await deletePerson(personId || "")
          toggleModal()
          if(data.success) {
            showMessage(data.message, "success")
            reloadWindow()
            }else {
            showMessage(data.message, "error")
          }
        }
        catch(err) {
            console.log(err)
          showMessage("Error", "error")
        }
      }


    return (


        <Modal isOpen={isOpen}>
        <div>
        <Row>
        <Col md={12} style={{fontSize:"20px"}} className='text-center pt-5 pb-2'>
        <p>Are you sure you want to delete this contact?</p>
        </Col>
        </Row>
        <Row>
        <Col md={12} className='text-center pb-5'>
        <Button 
        className='btn-success me-2'
        onClick={handleDeletePerson}
        >Yes</Button>                
        <Button
            className='btn-danger ms-2'
            onClick={toggleModal}
            >No</Button>
        </Col>

        </Row>
        </div>
    </Modal>

    )
}

export default DeleteModal;
