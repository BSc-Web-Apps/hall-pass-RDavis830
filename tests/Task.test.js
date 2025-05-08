import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Task } from "../app/index";
// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => {
    return {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
  });
  

describe("Task", () => {
  test("renders task with title and category", () => {
    render(<Task id="1" title="New Task" category="General" isChecked={false} />);
    
    const titleElement = screen.getByText("New Task");
    const categoryElement = screen.getByText("General");
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
  });
});