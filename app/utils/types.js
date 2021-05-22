export default types = [
  { label: "Personal", colors: ["#00cade", "#a4ebff"], value: 0 },
  { label: "Work", colors: ["#0DCEAF", "#5cffe5"], value: 1 },
  { label: "Shopping", colors: ["#ff8153", "#ffd2b9"], value: 2 },
  { label: "Travel", colors: ["#8d7cf9", "#c3bbfa"], value: 3 },
  { label: "Games", colors: ["#FF4646", "#FFCBB6"], value: 4 },
  { label: "Movies", colors: ["#FF4646", "#FFCBB6"], value: 5 },
]
export const priorityTypes = [
  { label: "Normal", value: 0 },
  { label: "Important", value: 1 }
]

export function getTypeName(type) {
  return types[type].label;
}