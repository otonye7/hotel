import { Modal }from "antd";

const ModalComponent = ({ session, orderedBy, showModals, setShowModals }) => {
    return (
        <Modal visible={showModals} title="Order Payment Info" onCancel={() => setShowModals(!showModals)}>
            <p>Payment Intent: {session.payment_intent}</p>
            <p>Payment Status: {session.payment_status}</p>
            <p>Amount Total: {session.currency.toUpperCase()} {session.amount_total / 100}</p>
            <p>Stripe Customer Id: {orderedBy.name}</p>
        </Modal>
    )
}

export default ModalComponent