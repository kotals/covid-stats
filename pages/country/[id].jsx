import style from '../../style/Country.module.css'
import Link from 'next/link';

export default function Country({ currentCountry }) {
  const country = currentCountry.response[0]
  
  const filtered = (info) => {
    if (info === null) {
      return 0
    }
    return info
  }

  return (
    <>
      <div className={style.country_content}>
        <div className={style.title}>Статистика по COVID-19</div>
        <div className={style.title}>{country.country}</div>
        <div style={{ margin: ' 23px 0' }}>
          <div className={style.items_item}>Континент:<span className={style.info}> {country.continent}</span></div>
          <div className={style.items_item} >Популяция:<span className={style.info}> {country.population}</span></div>
        </div>


        <div className={style.content}>

          <div className={style.items} >
            <div className={style.item_title}>Заболевшие: <span className={style.info}> {country.cases.total}</span> </div>
            <div className={style.items_item}> <span className={style.info, style.gray}>{country.cases['1M_pop']} / на 1 млн. населения </span></div>
            <div className={style.items_item}>Новые случаи за сутки: <span className={style.info, style.red}>{filtered(country.cases.new)}</span></div>
            <div className={style.items_item}>Болеют в активной стадии: <span className={style.info}> {filtered(country.cases.active)}</span></div>
            <div className={style.items_item}>Критическое состояние : <span className={style.info}>{filtered(country.cases.critical)}</span></div>
            <div className={style.items_item}>Выздоровели: <span className={style.info}>{country.cases.recovered}</span></div>
        <div style={{marginTop:'100px'}}><Link href={`/`} ><a className={style.back}>Назад</a></Link></div>
          </div>

          <div className={style.items}>
            <div className={style.item_title}>Умерли: <span className={style.info}> {country.deaths.total}</span></div>
            <div className={style.items_item}> <span className={style.info, style.gray}>{country.deaths['1M_pop']} / на 1 млн. населения </span></div>
          <div className={style.items_item}>Новые случаи за сутки:<span className={style.info, style.red}> { filtered(country.deaths.new)}</span></div>
          </div>

          <div className={style.items}>
            <div className={style.item_title} >Сдали тест: <span className={style.info}>{country.tests.total}</span></div>
            <div className={style.items_item}> <span className={style.info, style.gray}>{country.tests['1M_pop']} / на 1 млн. населения </span></div>
          </div>

        </div>
      </div>
  
    </>
  )
}



export async function getServerSideProps({ query }) {

  const response = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${query?.id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e0bb9497edmsh9195dc22e1b919ap1efc01jsnafbb36236ad9",
      "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
  })
  const currentCountry = await response.json()
  return {
    props: { currentCountry },
  }
}

