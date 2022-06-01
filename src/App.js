import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { useState } from 'react';
import EntryPoint from './Components/EntryPoint';
import ExitPoint from './Components/ExitPoint';
function App() {

  const interChangePoints = [
    { label: 'Zero point', value: 0 },
    { label: 'KMNS Interchange', value: 5 },
    { label: 'Ph4 Interchange', value: 10 },
    { label: 'Ferozpur Interchange', value: 17 },
    { label: 'Lake City Interchange', value: 24 },
    { label: 'Raiwand Interchange', value: 29 },
    { label: 'Bahria Interchange', value: 34 }
  ]

  const [submitResponse, setSubmitResponse] = useState("")

  const [entryPointData, setEntryPointData] = useState({
    Interchange: '',
    NumberPlate: '',
    TripStatus: 'Active',
    Date: getCurrentDate()
  })

  const [exitPointData, setExitPointData] = useState({
    Interchange: '',
    NumberPlate: '',
    TripStatus: 'Completed',
    Date: getCurrentDate()
  })

  const [fareCalculation, setFareCalculation] = useState({
    BaseRate: 20,
    DistanceCostBreakdown: 0,
    SubTotal: 0,
    Discount: 0,
    Total: 0
  })

  const [activeTab, setActiveTab] = useState('1')

  function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  const toggleTabs = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  const calculate = (e) => {
    e.preventDefault();
    const totalDistance = Math.abs(entryPointData.Interchange - exitPointData.Interchange)
    let totalFare = 0.2 * totalDistance;
    const entryDay = new Date(entryPointData.Date).getDay()
    const exitDay = new Date(exitPointData.Date).getDay()
    const exitDate = exitPointData.Date.split('/')[0] + exitPointData.Date.split('/')[1]

    if (['2303', '233'].includes() ||
      ['1407', '147'].includes(exitDate) ||
      exitDate === '2512') {
      setFareCalculation({
        ...fareCalculation,
        Discount: 50,
        DistanceCostBreakdown: totalFare,
        SubTotal: (totalFare + fareCalculation.BaseRate),
        Total: (totalFare + fareCalculation.BaseRate) * .5
      })
    }
    else if ([6, 0].includes(exitDay)) {
      totalFare = (totalFare * 1.5) + 20

      setFareCalculation({
        ...fareCalculation,
        Discount: 0,
        DistanceCostBreakdown: totalFare,
        SubTotal: totalFare,
        Total: (totalFare * 1.5) + fareCalculation.BaseRate
      })
    }
    else if ([1, 3].includes(entryDay) && exitPointData.NumberPlate.split('-')[1] % 2 === 0) {
      setFareCalculation({
        ...fareCalculation,
        Discount: 10,
        DistanceCostBreakdown: totalFare,
        SubTotal: totalFare + fareCalculation.BaseRate,
        Total: (totalFare * .9) + fareCalculation.BaseRate
      })
    }
    else {
      setFareCalculation({
        ...fareCalculation,
        Discount: 10,
        DistanceCostBreakdown: totalFare,
        SubTotal: totalFare + fareCalculation.BaseRate,
        Total: totalFare + fareCalculation.BaseRate
      })
    }
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggleTabs('1')}
            href='#'
          >
            Entry
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '2' })}
            onClick={() => toggleTabs('2')}
            href='#'>
            Exit
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <EntryPoint
            setEntryPointData={setEntryPointData}
            interChangePoints={interChangePoints}
            entryPointData={entryPointData}
            setSubmitResponse={setSubmitResponse}
            submitResponse={submitResponse} />
        </TabPane>

        <TabPane tabId='2'>
          <ExitPoint
            setExitPointData={setExitPointData}
            exitPointData={exitPointData}
            interChangePoints={interChangePoints}
            fareCalculation={fareCalculation}
            calculate={calculate} />
        </TabPane>
      </TabContent >
    </div >
  );
}

export default App;
