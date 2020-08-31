export class Queue {

    log: String;
    wait: Boolean;

    constructor(log) {
        this.log = log;
        this.wait = false;
    }

    _jobs = [];
    _runtimes = [];

    // dispatchJob saves the job with its resolver and rest arguments
    // It also starts the Execution
    async dispatchJob(cb, ...rest) {
        if(this.log) console.log(this._jobs.length);

        await new Promise((resolve, reject) => {
            const now = Date.now();
            this._jobs.push({ cb: cb, starttime: now, resolver: resolve, rest: rest });
            this.maybeExecute(false);
        })
    }

    // acts like a waterfall function: when there is more, execture it, when not: stop
    async maybeExecute(waterfall) {
        if ((this._jobs.length === 1 || waterfall) && !this.wait) {
            const job = this._jobs[0];
            
            if (job) {
                const result = await job["cb"](...job["rest"]);
                const resolver = job["resolver"];
                resolver(result);
                this._runtimes.push(Date.now() - job["starttime"]);
                this._jobs.shift();
                if(this.log) console.log("shift");
                this.maybeExecute(true);
            }
        }
    }

    // the queue can be paused, but be careful: then 2 processes can run at the same time
    pause()  {
        this.wait = true;
    }

    start() {
        this.wait = false;
        this.maybeExecute(true);
    }
}