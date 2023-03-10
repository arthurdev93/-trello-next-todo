import _ from 'lodash';
import { useEffect , useState } from 'react';
import Swal from 'sweetalert2';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import TasksModal from '@/components/tasks/TasksModal';


export default function TaskContainer({listTasks, onChangeTask, lists, listData}) {
    const [openModal, setOpenModal] = useState (false);
	const [task, setTask] = useState({});
	const [tasks, setTasks] = useState(listTasks);
	useEffect(() => {
		console.log(listData.title, 'listTasks', listTasks)
	}, [listTasks]);

    //onSaveTask é chamada quando uma tarefa é criada ou atualizada no modal
	const onSaveTask = (action, taskData) => {

		if (action === 'store') {
			const newTaskId = Math.floor(Math.random() * (999999999999 - 1 + 9999) + 1);	//geração de ID aleatório
			setTasks([ 
				...tasks, 
				{
					...taskData, 
					id: newTaskId,
					list: listData.id
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
		onChangeTask(task) 	//para após atualizar, limpar a task, para não gerar nenhum conflito na proxima criação
		 console.log('aqui')
		setOpenModal(false);	//para fechar o modal, apos clicar no botao
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

	// useEffect(()=>{
	// 	onChangeTask(tasks);
	// },[tasks])

    const removeTask = (taskID) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.isConfirmed) {
				setTasks(tasks.filter((task) => task.id !== taskID)); //aqui executa o delete
				Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)
			}
		  })
	}
	
	//A função updateTask é usada para abrir o modal com os dados da tarefa atualmente selecionada, para que ela possa ser editada.
	const updateTask = (taskData) => {
		setTask(taskData);
		setOpenModal(true);
	}

    return (
    <>
    	<TasksModal 
			onSaveTask={onSaveTask}
			task={task}	//status da task
			setOpen={setOpenModal}
			open={openModal}
			list={lists}
			listCol={listData}
	    />
        <div className="flex flex-col items-center rounded-lg bg-gray-300 my-2">
        <ul className="flex flex-col gap-1">	
			{
                tasks.map((task) => (
                    <li className="flex-row bg-white rounded-md shadow-md" key={task.id}>
						{/* <div className='flex gap-1 flex-row p-1'>
							{	
								task.listData.map((list)=>{
									const listData = _.find(lists, {id: list});

									return (
										<div className={'rounded-sm ' + listData.color}>
											{listData.title}
										</div>
									);
								})
							}
						</div> */}
                        <div className="flex items-center p-4">
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium text-lg dark:text-white">
                                    {task.title}
                                </div>
                            </div>
                            <button className="flex text-right px-2"
                                onClick={() => updateTask(task)}
                            >
                                <PencilIcon className='h-5 w-5 text-gray-800 hover:text-blue-700'/>
                            </button>
                            <button className="flex text-right"
                                onClick={() => removeTask(task.id)}
                            >
                                <TrashIcon className='h-5 w-5 text-gray-800 hover:text-blue-800'/>
                            </button>
                        </div>
                    </li>
                ))
            }            
        </ul> 
		</div> 									
		<button className='flex rounded-md border mr-auto mt-2 text-sm px-2 text-gray-900 bg-gradient-to-br from-gray-300 to-gray-400 transition ease-in hover:from-gray-400  hover:to-gray-300'
			onClick={() => setOpenModal(true)}
		>
			ADD TASK
		</button> 
    </>
    )
} 