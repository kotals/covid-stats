import Link from 'next/link';
import { useEffect, useState } from 'react'
import style from '../style/index.module.css'
import Image from 'next/image'
import arrow from '../images/Vector 2.png'
// import searchIcon from '../images/Vector.png'

const Index = ({ countries }) => {
  const country = countries.response.filter(el=> el !== 'R&eacute;union')

  const word = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const pageCount = word.split('').map((el, index) => [index + 1, el])

  const [search, setSearch] = useState('')
  const [filteredCountry, setFilteredCountry] = useState([])
  const [page, setPage] = useState(pageCount[0])

  useEffect(() => {
    setFilteredCountry(country.filter(el => el[0].toLowerCase() === page[1].toLowerCase()))
  }, [page])


  const paginationAuto = (num) => {
    const newPage = pageCount.find((el, i) => (i + 1) === num)
    return newPage
  }

  const changeHandler = (e) => {
    setSearch(e.target.value)
  }


  const changePage = (page) => {
    const [index, letter] = page
    setFilteredCountry(country.filter(el => el[0].toLowerCase() === letter.toLowerCase()))
    setPage(page)
  }


  return (
    <>
      <div className={style.container}>
        <div className={style.title}>Статистика по COVID-19</div>
        <div className={style.search}>
          <p>Поиск по стране</p>
          <div>
            <input id={style.searchCountry} value={search} onChange={changeHandler} type="search" />
            {/* непонятно как двигать через Image и как импортировать через <img> */}
            {/* <Image className={style.icon_search} src={searchIcon} alt="поиск" /> */}
          </div>
        </div>

        {
          search.length
            ?
            <ul className={style.country_list} >
              {
                search.length
                  ?
                  country?.filter((value, indx) => {
                    if (search === '') {
                      return value
                    }
                    else if (value.toLowerCase().includes(search.toLowerCase())) {
                      return value
                    }
                  }).map((el, i) => <li key={i}><Link href={`/country/${el}`} ><a className={style.link}>{el}</a></Link></li>)
                  :
                  ''
              }
            </ul>
            :
            <ul className={style.country_list}>
              {
                filteredCountry?.length && search.length === 0
                  ?
                  filteredCountry?.map((el, i) => <li key={i}><Link href={`/country/${el}`} ><a className={style.link}>{el}</a></Link></li>)
                  :
                  ''
              }
            </ul>
        }

        <div style={{ marginTop: '8px' }}>
          {
            page[0] > 1
              ?
              <Image className={style.arrow, style.arrowRotate} onClick={() => setPage(prev => paginationAuto(prev[0] - 1))} src={arrow} alt="стрелочка-влево" />
              :
              <Image className={style.arrow, style.arrowRotate} src={arrow} alt="стрелочка-влево" />
          }
          <span style={{margin:'0 30px'}}>
            {pageCount.map((el, index) => <span className={style.navi} onClick={() => changePage(el)} key={`${el}-${index}`}> {el[1]} </span>)}
          </span>
          {
            page[0] < pageCount.length
              ?
              <Image className={style.arrow} onClick={() => setPage(prev => paginationAuto(prev[0] + 1))} src={arrow} alt="стрелочка-вправо" />
              :
              ''
          }
        </div>
      </div>
    </>
  )
}

export default Index

export async function getStaticProps(context) {
  const response = await fetch("https://covid-193.p.rapidapi.com/countries", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e0bb9497edmsh9195dc22e1b919ap1efc01jsnafbb36236ad9",
      "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
  })
  const countries = await response.json()
  return {
    props: { countries },
  }
}

