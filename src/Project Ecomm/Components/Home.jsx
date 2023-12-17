import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Data from '../Data'
import Card from './Card'
import './Home.css'

const Home = ({search,handleClick,data}) => {
  return (
    <div>
        <main className="main">
            <img src="https://miro.medium.com/v2/resize:fit:1204/0*UyQVg5JSs3a4OOeg" height={'600px'} width={'100%'} alt="" />
        </main>
        <Carousel>
                {data.filter((item)=>item.category.toLocaleLowerCase().includes(search)).map((item)=>{
                    return(
                        <header key={item.id} style={{height:'600px', width:'80%', margin:'auto'}}>
                            <div>
                                 <img src={item.image} />
                                 <p className="legend">
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                    <p>{item.price}</p>
                                    <p>{item.rating.rate}⭐</p>
                                    <button onClick={()=>handleClick(item)}>Add Cart</button>
                                 </p>
                            </div>
                        </header>
                    )
                })}
    </Carousel>

        <section className="sec">
        {data.filter((item)=>item.category.toLocaleLowerCase().includes(search)).map((item)=>{
            return(
                <Card key={item.id} item={item} handleClick={handleClick}/>
            )
        })}
        </section>
        </div>
  )
}
export default Home