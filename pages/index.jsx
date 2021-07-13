import Stats from "./covid-stats"
import Link from 'next/link';
import Router from "next/router";

import { useEffect } from "react";

Router
const Index = () => {

  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/' ){
      Router.push('/covid-stats')
    }  
  }, [])

  return (
    <>

      <Link href="/covid-stats">
        <a> <Stats /></a>
      </Link>

    </>
  )
}

export default Index

