import _ from 'lodash';		//lodash tem varias funções utilitárias, como encontrar índices de elementos em um array
import { useEffect, useState } from 'react';
//cuidar ordem imports - ext/int
import LeftMenu from '@/components/LeftMenu';
import RightMenu from '@/components/RightMenu';
import SearchField from '@/components/SearchField';
import TaskContainer from '@/components/TaskContainer';

const lists = [
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
	const [list, setList] = useState(lists);
	const [tasks, setTasks] = useState([]);

	useEffect(()=>{
		console.log(tasks)
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
						lists.map((listData) => {
							return (
								<div className='bg-gray-200 rounded-lg p-2 text-xl' key={listData.id}>
									{listData.title}
									<div className='flex flex-col justify-center items-center'>
										<TaskContainer 
											name={listData.title}
											listTasks={_.filter(
												tasks,
												{
													list: listData.id
												}
											)}
											list={list}
											listData={listData}
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