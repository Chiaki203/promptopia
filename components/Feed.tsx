'use client'

import {useState, useEffect, ChangeEvent} from 'react'
import PromptCard from './PromptCard'
import { PromptType } from '@/type/prompt'

type CardListProps = {
  data: Array<PromptType>,
  handleTagClick: (tagName:string) => void
}

const PromptCardList = ({data, handleTagClick}:CardListProps) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<any>()
  const [searchedResults, setSearchedResults] = useState([])

  const filterPrompts = (searchText:string) => {
    const regex = new RegExp(searchText, 'i')
    return allPosts.filter((item:PromptType) => (
      regex.test(item.creator?.username!) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    ))
  }
  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    setSearchTimeout(setTimeout(() => {
      console.log('searched for', searchText)
      const searchResult = filterPrompts(e.target.value)
      setSearchedResults(searchResult)
    }, 500))
  }
  const handleTagClick = (tagName:string) => {
    setSearchText(tagName)
    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }
  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      console.log('Feed fetched posts', data)
      setAllPosts(data || [])
    }
    fetchPosts()
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or username"
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={searchText ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed