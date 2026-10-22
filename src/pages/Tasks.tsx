import { useState } from "react";
import CreateTask from "../features/tasks/components/CreateTask";
import { Plus, CheckSquare, Sparkles, Filter, Search } from "lucide-react";

function Tasks() {
    const [createTaskModal, setCreateTaskModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="space-y-6">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tasks</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Organize, track, and collaborate on your team's sprint tasks
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setCreateTaskModal(true)}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Task</span>
                    </button>
                </div>
            </div>

            {/* Filter / Search Bar (UX mockup preview) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 font-medium text-slate-600">
                        <Filter className="w-3.5 h-3.5" />
                        Kanban & List Views
                    </span>
                </div>
            </div>

            {/* Modern Board / Coming Soon Canvas */}
            <div className="min-h-[380px] bg-slate-50/60 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
                    <CheckSquare className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Kanban Board In Development</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Interactive Task Board Coming Soon</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                    We are crafting a drag-and-drop Kanban workflow. In the meantime, you can create tasks right away using the button below.
                </p>
                <button
                    type="button"
                    onClick={() => setCreateTaskModal(true)}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create a Task</span>
                </button>
            </div>

            {createTaskModal && <CreateTask onClose={() => setCreateTaskModal(false)} />}
        </div>
    );
}

export default Tasks;