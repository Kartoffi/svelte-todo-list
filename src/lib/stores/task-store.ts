import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Task {
    id: string;
    text: string;
    done: boolean;
}

const STORAGE_KEY = 'tasks';

function getInitialTasks(): Task[] {
    if (browser) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    }
    return [];
}

export const taskStore = writable<Task[]>(getInitialTasks());

if (browser) {
    taskStore.subscribe(tasks => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    });
}

export function addTask(task: Task) {
    taskStore.update((tasks) => {
        const newTask: Task = {
            id: task.id,
            text: task.text,
            done: task.done || false
        };
        return [...tasks, newTask];
    });
}

export function removeTask(id: string) {
    taskStore.update((tasks) => tasks.filter((task) => task.id !== id));
}

export function toggleTask(id: string) {
    taskStore.update((tasks) =>
        tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        )
    );
}

export function clearCompleted() {
    taskStore.update((tasks) => tasks.filter((task) => !task.done));
}

export function setTasks(tasks: Task[]) {
    taskStore.set(tasks);
}