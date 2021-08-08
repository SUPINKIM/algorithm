using System;
using System.Collections.Generic;
using System.Text;

namespace _1406
{
    class Program
    {
        static void Main(string[] args)
        {
            Stack<string> stack1 = new Stack<string>();
            Stack<string> stack2 = new Stack<string>();
            var input = Console.ReadLine();
            int input2 =  int.Parse( Console.ReadLine());
            stack1.Push(input);
            for(int i =0; i<input2; i++)
            {
                
                string[] cmd = Console.ReadLine().Split(" ");
                var cmd1 = cmd[0];
                switch(cmd1)
                {
                    case "L":
                        if (stack1.Count !=0)
                            stack2.Push(stack1.Pop());
                        break;
                    case "D":
                        if (stack2.Count != 0)
                            stack1.Push(stack2.Pop());
                        break;
                    case "B":
                        if (stack1.Count != 0)
                            stack1.Pop();
                        break;
                    case "P":
                        stack1.Push(cmd[1]);
                        break;
                }
            }
            StringBuilder result = new StringBuilder();
            while(stack1.Count !=0)
            {
                stack2.Push(stack1.Pop());
            }
            while(stack2.Count !=0)
            {
                result.Append(stack2.Pop());
            }
            Console.WriteLine(result);
        }
    }
}
