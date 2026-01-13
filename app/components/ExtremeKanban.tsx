"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Task = { id: string; title: string };
type Column = { id: string; name: string; tasks: Task[] };
const STORAGE_KEY = "extreme-kanban";

function SortableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-gray-700 rounded cursor-grab hover:bg-gray-600"
    >
      {task.title}
    </div>
  );
}

export default function ExtremeKanban() {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setColumns(JSON.parse(saved));
    } else {
      setColumns([
        {
          id: "todo",
          name: "To Do",
          tasks: [
            { id: "1", title: "Buy milk" },
            { id: "2", title: "Learn Next.js" },
          ],
        },
        {
          id: "inprogress",
          name: "In Progress",
          tasks: [{ id: "3", title: "Build feature" }],
        },
        {
          id: "done",
          name: "Done",
          tasks: [{ id: "4", title: "Deploy app" }],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (
    event: DragEndEvent,
    colIndex: number
  ) => {
    const { active, over } = event;
    if (!over) return;

    const taskIndex = columns[colIndex].tasks.findIndex(
      (t) => t.id === active.id
    );
    const overIndex = columns[colIndex].tasks.findIndex(
      (t) => t.id === over.id
    );
    if (taskIndex === -1 || overIndex === -1) return;

    const newTasks = arrayMove(columns[colIndex].tasks, taskIndex, overIndex);
    const newCols = [...columns];
    newCols[colIndex].tasks = newTasks;
    setColumns(newCols);
  };

  const addTask = (colIndex: number) => {
    const title = prompt("Task title?");
    if (!title) return;
    const newCols = [...columns];
    newCols[colIndex].tasks.push({ id: Date.now().toString(), title });
    setColumns(newCols);
  };

  return (
    <div className="flex gap-6 overflow-x-auto py-4">
      {columns.map((col, colIndex) => (
        <div
          key={col.id}
          className="bg-gray-800 rounded-xl p-4 w-64 flex-shrink-0"
        >
          <h3 className="text-lg font-bold mb-2">{col.name}</h3>
          <button
            onClick={() => addTask(colIndex)}
            className="mb-2 text-sm px-2 py-1 bg-blue-500 rounded hover:bg-blue-400"
          >
            + Add Task
          </button>

          <DndContext
            sensors={sensors}
            onDragEnd={(e) => handleDragEnd(e, colIndex)}
          >
            <SortableContext
              items={col.tasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {col.tasks.map((task) => (
                  <SortableTask key={task.id} task={task} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
}
