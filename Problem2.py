def solve(arr):
    if not arr: return 0
    result = (0, -1, [])

    for i in range(len(arr)):
        if arr[i] < 0: continue
        prev = None if i -1 < 0 else arr[i-1]
        next = None if i + 1 == len(arr) else arr[i+1]
        nxt = []
        for j in range(0, i-1):
            if arr[j] == prev or arr[j] == next: continue
            nxt.append(arr[j])

        for j in range(i+2, len(arr)):
            if arr[j] == prev or arr[j] == next: continue
            nxt.append(arr[j])



        maxi = arr[i] + (max(0, max(nxt)) if nxt else 0)

        #print(arr[i], maxi ,nxt)
        if result[0] < maxi:
            result = (maxi, i, nxt)
        elif result[0] == maxi and arr[i] > arr[result[1]]:
            result = (maxi, i, nxt)


    return arr[result[1]] + solve(result[2]) if result[1] >=0 else 0


print(solve([1,1,4,1,1]))
print(solve([1,1,1,1,1,1,1,10]))
print(solve([-1,3,2,3,4,3]))
print(solve([-1,-2,-3]))
print(solve([i for i in range(11)]))
