import { PencilIcon, TrashIcon, ClipboardCopyIcon } from "@heroicons/react/solid"
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, {useState} from 'react';

interface Props {
    id:string
    title:string, 
    desc:string, 
    credentials:string
}

const ProjectDetailsCard = ({ id, title, desc, credentials }: Props) => {
    const [disabled, setDisabled] = useState(false);

    function toggleEdit() {
        setDisabled(!disabled);
    }

    return (
        <div className="w-full rounded-lg border relative">
            <div className="p-8 inline-grid grid-cols-2 gap-2">
                <h3 className="lg:text-2xl text-xl font-semibold text-blue-500">{ title }</h3>
                <div className="inline-grid grid-cols-2 gap-4 absolute right-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={toggleEdit}>
                        <span className="inline-flex">
                            <span>Edit</span>
                        </span>
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Delete</button>
                </div>
            </div>
            <hr />
            <div className="p-8 text-slate-400 w-full">
                <div className="inline-grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <label htmlFor="id">Project Id</label>
                        <input type="text" id="id" className="p-4 text-slate-400 border w-full rounded-lg" placeholder={ id } disabled={disabled}/>
                    </div>
                    <div>
                        <label htmlFor="key">Secret Key</label>
                        <div className="flex items-center">
                            <input type="text" id="key" className="p-4 text-slate-400 border w-full rounded-lg" placeholder={ credentials } disabled={true}/>
                            <CopyToClipboard
                                text={ credentials }
                                onCopy={() => alert("Secret Key Copied")}>
                                <ClipboardCopyIcon className="h-10 w-10 ml-2"/>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Project Description</label>
                    <input type="text" id="description" className="p-4 text-slate-400 border w-full rounded-lg" placeholder={ desc } disabled={disabled}/>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailsCard;