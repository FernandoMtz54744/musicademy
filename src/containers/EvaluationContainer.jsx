import React from 'react'
import Evaluation from '../pages/Evaluation'
import { useParams } from 'react-router-dom';
import Header from '../pages/Header';

export default function EvaluationContainer() {
    const {submodulo} = useParams();

    

    return (
        <>
            <Header headerColor={"header-purple"}/>
            <div className='modulos'>
                <Evaluation submodulo={submodulo}/>
            </div>
        </>
  )
}
