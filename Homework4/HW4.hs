--added Nil for more diverse tree possibilities
data Tree = Nil | Leaf Int | Node Tree Int Tree deriving Show		

getNumLeafNodes 				:: Tree -> Int
getNumLeafNodes (Nil)			= 0
getNumLeafNodes (Leaf n) 		= 1
getNumLeafNodes (Node l n r) 	= 1 + getNumLeafNodes l + getNumLeafNodes r

balanced				:: Tree -> Bool
balanced (Nil)			= True

balanced (Leaf n)		= True
balanced (Node l n r)	= 
	if ((getNumLeafNodes l == getNumLeafNodes r) && balanced l && balanced r)
		then True
		else if ((getNumLeafNodes l == (getNumLeafNodes r) + 1) && balanced l && balanced r)
			then True
			else if ((getNumLeafNodes l == (getNumLeafNodes r) - 1) && balanced l && balanced r)
				then True
				else False