import _ from 'lodash';		//lodash tem varias funções utilitárias, como encontrar índices de elementos em um array
import { useEffect, useState } from 'react';
//cuidar ordem imports - ext/int
import LeftMenu from '@/components/LeftMenu';
import RightMenu from '@/components/RightMenu';
import SearchField from '@/components/SearchField';
import TaskContainer from '@/components/TaskContainer';

const listsData = [
	{
		id: '123',
		title: 'To Do'
	},
	{
		id: '456',
		title: 'Doing'
	},
	{
		id: '789',
		title: 'Done'
	}
];

export default function Home() {
	const [lists, setLists] = useState(listsData);
	const [tasks, setTasks] = useState([]);

	useEffect(()=>{
		console.log('opa')
		setLists(lists);
	},[tasks])

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
				</header>
				<div className='flex flex-row justify-center py-10 gap-4'>
					{
						lists.map((list) => {
							return (
								<div className='bg-gray-200 rounded-lg p-2 text-xl' key={list.id}>
									{list.title}
									<div className='flex flex-col justify-center items-center'>
										<TaskContainer 
											name={list.title}
											listTasks={_.filter(
												tasks,
												{
													list: list.id
												}
											)}
											lists={lists}
											listData={list}
											onChangeTask={setTasks}	
										/> 
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className='flex w-2/12 bg-gray-700 text-white'> 
				<RightMenu />
			</div>
		</div>
	</>
	)
}