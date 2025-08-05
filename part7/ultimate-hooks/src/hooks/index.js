import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    async function getAll () {
      const res = await axios.get(baseUrl)
      setResources(res.data)
    }
    getAll()
  }, [baseUrl])

  const create = async resource => {
    await axios.post(baseUrl, resource)
    setResources(resources.concat(resource))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}