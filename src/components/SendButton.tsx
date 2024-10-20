interface state {
	result: string;
	type: string;
	icon: ImageMetadata | null;
}
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import check from '../assets/icons/circle-check.svg';
import error from '../assets/icons/exclamation-circle.svg';
const SERVICE_ID = import.meta.env.PUBLIC_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_KEY;
const initicalState:state = {
	result: "",
	type: "",
	icon: null
};

const Alert = ({ type, result, src }:{type:string, result:string, src:string | undefined}) => {
	if(!src) return null;
	return (
		<div className={`flex flex-row rounded-md p-2 text-white gap-2 col-span-2 ${ type === "success" ? "bg-green-500" : "bg-red-500"}`}>
			<img src={src} alt={type} />
			{result}
		</div>
	);
};

const SendButton = () => {
	const [state, setState] = useState<state>(initicalState);
	const [disabled, setDisabled] = useState<boolean>(false);

	const resetFrom = (dataForm:FormData) => {
		dataForm.delete("name");
		dataForm.delete("email");
		dataForm.delete("subject");
		dataForm.delete("message");
	};

	const updateState = (state:state, dataForm:FormData) => {
		setState(e=>({...e, ...state}));
		setDisabled(e=>!e);
		resetFrom(dataForm)
		setTimeout(()=>{
			setState(e=>({...e, ...initicalState}));
		}, 6000);
	};

	const sendEmail = async (event:React.SyntheticEvent) => {
		event.preventDefault();
		const form = document.querySelector("form");
		const dataForm = new FormData(form as HTMLFormElement | undefined);
		const formContact = {
			fullName: dataForm.get("name"),
			email: dataForm.get("email"),
			subject: dataForm.get("subject"),
			message: dataForm.get("message"),
		};
		setDisabled(e=>!e);
		
		emailjs.send(SERVICE_ID, TEMPLATE_ID, formContact, PUBLIC_KEY).then(()=>{
			const msgAlert:state = {result:"Message sent successfully.", type:"success", icon:check};
			updateState(msgAlert,dataForm);
		}).catch(()=>{
			const msgAlert:state = {result:"The message could not be sent, please try again.", type:"error", icon:error};
			updateState(msgAlert,dataForm);
		});      
	};
			
			
	return (
		<>
			<button
				type="submit"
				className="p-2 col-span-2 md:col-span-1 md:col-start-2 w-full md:w-60 text-orange-500 text-base font-bold bg-zinc-700 rounded-md ml-auto hover:bg-orange-500 hover:text-zinc-700 transition-colors duration-300 disabled:bg-slate-950 disabled:text-zinc-700"
				onClick={sendEmail}
				disabled={disabled}
			>
				Send message
			</button>
			<Alert type={state.type} result={state.result} src={state.icon?.src} />
		</>
	);


};

export default SendButton;