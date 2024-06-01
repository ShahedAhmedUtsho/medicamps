'use client'
import { useContext, useState } from 'react'
import { Check ,WarningOctagon} from 'phosphor-react'
import { Button, Modal } from 'keep-react'
import { AuthContext } from '../AuthProvider/AuthProvider'


 const ErrorModel = () => {
const {closeModal,closeErrorModal,openErrorModal,isErrorOpen,setModelMessage,setModelHead,modelHead,modelMessage} =useContext(AuthContext)

  return (
    <>
     
      <Modal isOpen={isErrorOpen} onClose={closeErrorModal}>
        <Modal.Body className="flex w-[30rem] flex-col items-center p-6 lg:p-8">
          <Modal.Icon className="h-20 w-20 border border-red-100 bg-red-50 text-red-500">
            <WarningOctagon size={60} />
          </Modal.Icon>
          <Modal.Content className="my-4 text-center">
            <h3 className="mb-2 text-body-1 font-bold text-metal-900">{modelHead}</h3>
            <p className="mx-auto max-w-xs text-body-4 font-normal text-metal-600">
            {modelMessage}
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeErrorModal} size="sm" color="error">
              Okey
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ErrorModel