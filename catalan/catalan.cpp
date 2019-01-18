#include<iostream>
using namespace std;

const long long mod = 1e9+7;

long long var(long long a, long long b) {
	long long otg = 1;
	for(long long i = a; i <= b; i++) {
		otg = (otg*i) % mod;
	}
	return otg;
}

long long stepen(long long a, long long n) {
	long long otg = 1;
	long long basa = a;
	while(n!=0){
		if(n%2==1) {
			otg = (otg * a) % mod;
		}
		a = (a*a) % mod;
		n/=2;
	}

	return otg;
}

int main(){
	long long n;
	cin >> n;

	long long a = var(n+2,2*n), b = var(1,n);
	long long c = ( a * stepen(b, mod-2) ) % mod;
	cout << c <<"\n";
	return 0;
}
