import _ from 'lodash';		//lodash tem varias funções utilitárias, como encontrar índices de elementos em um array
import { useEffect, useState } from 'react';	//hooks de estado e efeito do ReactJS
import Swal from 'sweetalert2';
//cuidar ordem imports - ext/int
import LeftMenu from '@/components/LeftMenu';
import SearchField from '@/components/SearchField';
import TaskContainer from '@/components/TaskContainer';
import TasksModal from '@/components/tasks/TasksModal';

export default function Home() {
	const [openModal, setOpenModal] = useState (false);
	const [task, setTask] = useState({});
	const [tasks, setTasks] = useState([
		{
			id: '123',
			status: true,
			title: 'first task'
		}
	]);

	//onSaveTask é chamada quando uma tarefa é criada ou atualizada no modal
	const onSaveTask = (action, taskData) => {

		if (action === 'store') {
			const newTaskId = Math.floor(Math.random() * (999999999999 - 1 + 9999) + 1);	//geração de ID aleatório
			setTasks([ 
				...tasks, 
				{
					...taskData, 
					id: newTaskId
				}
			]) //Se uma tarefa existente estiver sendo atualizada, é encontrada pelo seu ID e atualizada no array de tarefas

		} else {
			const newTasks = tasks;		
			const taskIndex = _.findIndex(newTasks, {id: taskData.id})	
			if (taskIndex !== -1) {
				newTasks[taskIndex] = taskData;
				setTasks(newTasks)			
			} 
		} 
		// setTask({}) 	//para após atualizar, limpar a task, para não gerar nenhum conflito na proxima criação
		setOpenModal(false)	//para fechar o modal, apos clicar no botao
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Task list updated',
			showConfirmButton: false,
			timer: 1500
		  })
	}

	//O useEffect é usado para redefinir a tarefa atual para um objeto vazio sempre que o modal é fechado. Finalmente, o componente renderiza a lista de tarefas e o botão para abrir o modal.
	useEffect(() => {
		if (!openModal) {
			setTask ({})	//para zerar o objeto no modal, quando ele for fechado = reset
		}
	}, [openModal]
	) 
	  	  
	  
	return (
		<>
		<TasksModal 
			onSaveTask={onSaveTask}
			task={task}	//status da task
			setOpen={setOpenModal}
			open={openModal}
		/>
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