import BrokerList from "../elements/brokerList/BrokerList";
import CreateBrokerModal from "../elements/createBrokerModal/createBrokerModal";

function BrokerListPage() {


    return (
        <div>
            <h1 align='center'>Список брокеров</h1>
            <BrokerList/>
            <CreateBrokerModal/>
        </div>
    );
}

export default BrokerListPage;