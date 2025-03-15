import React, { createContext, useContext, useState } from "react";

interface ErrorItem {
	id: string;
	message: string;
}

interface ErrorStackContextType {
	errorStack: ErrorItem[];
	addError: (id: string, message: string) => void;
	removeError: (id: string) => void;
}

const ErrorStackContext = createContext<ErrorStackContextType | undefined>(
	undefined
);

// custom hook for ErrorStack to add and remove app errors from the stack
export function useErrorStack() {
	const context = useContext(ErrorStackContext);
	if (!context) {
		throw new Error(
			"useErrorStack must be used within an ErrorStackProvider"
		);
	}
	return context;
}

// provider for ErrorStack to track and display app errors
export default function ErrorStackProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [errorStack, setErrorStack] = useState<ErrorItem[]>([]);

	const addError = (id: string, message: string) => {
		setErrorStack((prevErrors) => {
			const duplicateErrorIndex: number = prevErrors.findIndex(
				(error) => error.id === id
			);
			if (duplicateErrorIndex >= 0)
				prevErrors.splice(duplicateErrorIndex, 1);
			return [...prevErrors, { id, message }];
		});
	};

	const removeError = (id: string) => {
		setErrorStack((prevErrors) =>
			prevErrors.filter((error) => error.id !== id)
		);
	};

	return (
		<ErrorStackContext.Provider
			value={{ errorStack, addError, removeError }}
		>
			{children}
		</ErrorStackContext.Provider>
	);
}
