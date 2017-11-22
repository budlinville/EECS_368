merge :: (Ord a) => [a] -> [a] -> [a]
merge [] [] = []
merge (x:xs) [] = x:xs
merge [] (x:xs) = x:xs
merge (x:xs) (y:ys) = 
	if (x <= y) 
		then x:(merge xs (y:ys)) 
		else y:(merge (x:xs) ys)