import React, { useEffect,useState, useMemo } from 'react'
import '../styles/Candidates.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'
import Pagination from './Pagination';

let PageSize = 4

export default function List(props){
    const [currentPage, setCurrentPage] = useState(1);

    const candidatesData = props.candidatesData
    const currentCandidatesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return candidatesData.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);

    return(
        <div className="candidate-list">
            <table>
                <caption><h1>List of Candidates eligible for Interview</h1></caption>
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Email</th>
                        <th>College</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {currentCandidatesData.map((candidate) => {
                        return (
                            <tr>
                                <td>{candidate.name}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.college}</td>
                                <td>{candidate.position}</td>
                            </tr>
                        )
                    })} 
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={candidatesData.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}