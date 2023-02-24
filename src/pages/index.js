import _ from 'lodash';		//lodash tem varias funções utilitárias, como encontrar índices de elementos em um array
import { useState } from 'react';
//cuidar ordem imports - ext/int
import LeftMenu from '@/components/LeftMenu';
import SearchField from '@/components/SearchField';
import TaskContainer from '@/components/TaskContainer';

export default function Home() {

	return (
	<>
		<div className='flex flex-row gap-2 bg-gray-800 h-screen w-screen'>
			<div className='flex flex-col w-2/12 bg-gray-700 text-white'> 
				<LeftMenu />
			</div>
			<div className='bg-gray-800 w-8/12'>
				<header className='flex flex-row p-0 m-3'>
					<div className="container my-auto">
						<SearchField />
					</div>
				<button className='flex flex-none justify-center items-center rounded-md border px-2 text-white bg-gradient-to-br from-sky-500 to-sky-800 transition ease-in hover:from-sky-800 hover:to-sky-500'
					onClick={() => setOpenModal(true)}
				>
					ADD TASK
				</button>
				</header>
				<div className='flex flex-row py-10'>
					<TaskContainer />
				</div>
			</div>
			<div className='flex w-2/12 bg-gray-700 text-white'> 
				<div className='p-3 mx-auto'>
					<h1>MENU DIREITA</h1>
				</div>
			</div>
		</div>
	</>
	)
}