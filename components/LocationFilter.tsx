/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import qs from "query-string"
import { useEffect, useState } from "react"
import Container from "./Container"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select"
import useLocation from "@/hooks/useLocation"
import { SelectItem } from "@radix-ui/react-select"
import { ICity, IState } from "country-state-city"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"

function LocationFilter() {
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])

  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const {getAllCountries, getCountryStates, getStateCities} = useLocation()
  const countries = getAllCountries()

  useEffect(()=> {
    const countryState = getCountryStates(country)
    if(countryState){
      setStates(countryState)
      setState("")
      setCity("")
    }
  }, [country])

  useEffect(()=> {
    const stateCities = getStateCities(country, state)
    if(stateCities){
      setCities(stateCities)
      setCity("")
    }
  }, [country, state])

  useEffect(()=> {
    if(country === "" && state === "" && city === "") return router.push("/")

    let currentQuery: any = {}
    if(params){
      currentQuery = qs.parse(params.toString())
    }

    if(country) {
      currentQuery= {
        ...currentQuery,
        country
      }
    }

    if(state) {
      currentQuery= {
        ...currentQuery,
        state
      }
    }

    if(city) {
      currentQuery= {
        ...currentQuery,
        city
      }
    }

    if(state === "" && currentQuery.state){
      delete currentQuery.state
    }

    if(city === "" && currentQuery.city){
      delete currentQuery.city
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: currentQuery,
    }, { skipNull: true, skipEmptyString: true })

    router.push(url)
  }, [country, state, city])

  const handleClear = () => {
    router.push("/")
    setCountry("")
    setState("")
    setCity("")
  }

  if(pathname !== "/") return null;

  return (
    <Container>
      <div className="flex gap-1.5 md:gap-4 items-center mx-4 md:mx-1 md:px-2 justify-center text-sm">
        <div className="ml-2">
          <Select
            onValueChange={(value)=> setCountry(value)}
            value={country}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country)=> {
                return <SelectItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            onValueChange={(value)=> setState(value)}
            value={state}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {state.length > 0 && states.map((state)=> {
                return <SelectItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            onValueChange={(value)=> setCity(value)}
            value={city}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.length > 0 && cities.map((city)=> {
                return <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>
        <Button className="mr-2" onClick={()=> handleClear()} variant="outline">Clear </Button>
      </div>
    </Container>
  )
}

export default LocationFilter