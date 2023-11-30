import { useEffect } from 'react'
import { locale, loadMessages } from "devextreme/localization";
import ruMessages from "devextreme/localization/messages/ru.json";
import Gallery from 'devextreme-react/gallery';
import './App.css'
import { SessionTemplate } from './components/SessionTemplate';
import 'devextreme/dist/css/dx.material.blue.dark.compact.css';

const condor_test = [{
  id: 1,
  quantityOfRoutes: 12,
  date: new Date("1995-12-17T03:24:00"),
  recieveNumber: 2323,
  remainingTime: new Date(0, 0, 2, 3, 12, 23),
}, {
  id: 2,
  quantityOfRoutes: 4,
  date: new Date("1995-12-17T03:24:00"),
  recieveNumber: 8956,
  remainingTime: new Date(0, 0, 10, 1, 28, 10),
},
{
  id: 3,
  quantityOfRoutes: 37,
  date: new Date("1995-12-17T03:24:00"),
  recieveNumber: 2323,
  remainingTime: new Date(0, 0, 10, 13, 2, 34,),
},
{
  id: 4,
  quantityOfRoutes: 2,
  date: new Date("1995-12-17T03:24:00"),
  recieveNumber: 33312342,
  remainingTime: new Date(0, 0, 10, 4, 12, 45),
},
{
  id: 5,
  quantityOfRoutes: 8,
  date: new Date("1995-12-17T03:24:00"),
  recieveNumber: 7794,
  remainingTime: new Date(0, 0, 8, 4, 29, 11),
},]

function App() {

  useEffect(()=> {
    loadMessages(ruMessages);
    locale("ru");
  },[])

  return (
    <div style={{backgroundColor: "gray", height: "100%", width: "100%"}}>
      <div className='dx-theme-background-color'>
      <Gallery
            id="gallery"
            dataSource={condor_test}
            height={100}
            loop={true}
            showNavButtons={true}
            showIndicator={true} 
            noDataText='Нет данных'
            itemComponent={SessionTemplate}
            width={"100%"}
            />
      </div>
    </div>
  )
}

export default App
