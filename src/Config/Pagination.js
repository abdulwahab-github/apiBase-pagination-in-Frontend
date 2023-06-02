import React from 'react'

function Pagination({perpge , total , paginate}) {
    const pageNumbers =[];
    for(let i = 1 ; i <= Math.ceil(total / perpge ); i++){
        pageNumbers.push(i)
    }

  return (
    <nav>
        <div className='txt1'>
        <ul className='pagination'>
            {pageNumbers.map(number=>(
               <li key={number} className=' ms-2 page-item'>
               <a  onClick={()=>paginate(number)} className='page-link'>
                {number}
               </a>
               </li>
            ))} 
        </ul>
        </div>
    </nav>
  )
}

export default Pagination